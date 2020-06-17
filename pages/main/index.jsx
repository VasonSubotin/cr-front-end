import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";
import { PolicySelector } from "components/PolicySelector";
import { Schedule } from "components/Schedule";
import { resourcesSelectors, resourcesActions } from "modules/resources";

/**
 * Main page.
 */
const MainPage = ({ scheduleInfo, setSchedulePolicyType }) => {
  const handlePolicySubmit = ({ policy, showAgain }) => {
    setSchedulePolicyType(policy);
  };

  const renderContent = () => {
    if (!scheduleInfo.resourceId) {
      return <CarsList />;
    }
    if (scheduleInfo.resourceId && scheduleInfo.policyType) {
      return <Schedule />;
    }

    return <PolicySelector onSubmit={handlePolicySubmit} />;
  };

  return <AuthLayout>{renderContent()}</AuthLayout>;
};

const mapStateToProps = (state) => ({
  scheduleInfo: resourcesSelectors.getScheduleInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSchedulePolicyType: (policyType) =>
    dispatch(resourcesActions.setSchedulePolicyType(policyType)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuth)(MainPage);
