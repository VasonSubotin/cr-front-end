import React from "react";

import { withAuthPage } from "components/hoc/withAuthPage";
import { AuthLayout } from "components/Layout";

/**
 * Session page.
 */
const SessionPage = () => <AuthLayout>Session page</AuthLayout>;

export default withAuthPage(SessionPage);
