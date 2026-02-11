"use client";

import { withAuthGuard } from "@hoc/with-auth-guard";
import { Layout } from "@layouts/dashboard";

export default withAuthGuard(Layout);