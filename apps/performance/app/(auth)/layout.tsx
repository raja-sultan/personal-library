"use client";

import { withGuestGuard } from "@hoc/with-guest-guard";
import { AuthLayout } from "common";

export default withGuestGuard(AuthLayout);
