/**
 * Tiny XML serializer used by SAF-T and other XML-shaped exports.
 *
 * Intentionally not a full DOM — XML output for fixed schemas has no
 * need for namespaces-on-attributes or processing instructions beyond
 * the prolog. Escapes the five XML predefined entities and rejects
 * control characters that would make the document invalid.
 */

const FORBIDDEN_CONTROL = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;

export function escapeXml(input: string): string {
  return input
    .replace(FORBIDDEN_CONTROL, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export type XmlNode =
  | { tag: string; attrs?: Record<string, string | number>; children?: XmlNode[] }
  | { tag: string; attrs?: Record<string, string | number>; text: string | number }
  | { raw: string };

function isText(n: XmlNode): n is { tag: string; attrs?: Record<string, string | number>; text: string | number } {
  return 'text' in n;
}
function isRaw(n: XmlNode): n is { raw: string } {
  return 'raw' in n;
}

export function renderXml(root: XmlNode, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (isRaw(root)) return root.raw;
  const attrs = root.attrs
    ? Object.entries(root.attrs)
        .map(([k, v]) => ` ${k}="${escapeXml(String(v))}"`)
        .join('')
    : '';
  if (isText(root)) {
    return `${pad}<${root.tag}${attrs}>${escapeXml(String(root.text))}</${root.tag}>`;
  }
  const children = root.children ?? [];
  if (children.length === 0) {
    return `${pad}<${root.tag}${attrs} />`;
  }
  const inner = children.map((c) => renderXml(c, indent + 1)).join('\n');
  return `${pad}<${root.tag}${attrs}>\n${inner}\n${pad}</${root.tag}>`;
}

export const XML_PROLOG = '<?xml version="1.0" encoding="UTF-8"?>';

/** Helper for the ubiquitous {tag, text} pattern. */
export function el(tag: string, text: string | number | null | undefined): XmlNode {
  return { tag, text: text == null ? '' : text };
}

/** Helper for {tag, children} groups. */
export function group(tag: string, children: XmlNode[], attrs?: Record<string, string | number>): XmlNode {
  return { tag, attrs, children };
}
