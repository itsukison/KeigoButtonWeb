// Runs after the document loads and before React hydrates (Next.js client
// instrumentation), so campaign parameters are read and stored before any
// route change can strip them from the URL.
import { initAnalytics } from "@/lib/analytics";

initAnalytics();
