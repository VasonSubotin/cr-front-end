import React from "react";

import { withAuthPage } from "components/hoc/withAuthPage";
import { AuthLayout } from "components/Layout";

/**
 * Demo page.
 */
const DemoPage = () => <AuthLayout>Demo page</AuthLayout>;

export default withAuthPage(DemoPage);
