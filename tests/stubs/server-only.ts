// Vitest-only stand-in for the `server-only` marker package. The real
// package throws at module-load time if imported into a client bundle;
// in the unit-test environment we want to import server helpers, so
// this file is the empty replacement aliased in vitest.config.ts.
export {};
