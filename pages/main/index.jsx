import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { resourcesSelectors } from "modules/resources";
import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";
import { PolicySelector } from "components/PolicySelector";

/**
 * Main page.
 */
const MainPage = ({ scheduleInfo }) => {
  const renderContent = () => {
    if (!scheduleInfo.resourceId) {
      return <CarsList />;
    }
    if (scheduleInfo.resourceId && scheduleInfo.policyType) {
      return <CarsList />;
    }

    return <PolicySelector />;
  };

  return <AuthLayout>{renderContent()}</AuthLayout>;
};

const mapStateToProps = (state) => ({
  scheduleInfo: resourcesSelectors.getScheduleInfo(state),
});

export default compose(connect(mapStateToProps, null), withAuth)(MainPage);
