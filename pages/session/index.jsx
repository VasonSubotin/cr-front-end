import React from "react";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";

/**
 * Session page.
 */
const SessionPage = () => <AuthLayout>Session page</AuthLayout>;

export default withAuth(SessionPage);
