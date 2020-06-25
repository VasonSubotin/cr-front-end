import React from "react";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";

/**
 * Demo page.
 */
const DemoPage = () => <AuthLayout>Demo page</AuthLayout>;

export default withAuth(DemoPage);
