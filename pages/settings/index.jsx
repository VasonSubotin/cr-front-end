import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { FormDialog } from "components/FormDialog";
import { ChangePasswordForm } from "components/forms/ChangePassword";

/**
 * Settings page.
 */
const SettingsPage = () => {
  const [isShowChangePasswordDialog, setIsShowChangePasswordDialog] = useState(false);

  return (
    <AuthLayout>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={() => setIsShowChangePasswordDialog(true)}>
            Change password
          </Button>
        </Grid>
      </Grid>
      <FormDialog
        title="Change password"
        open={isShowChangePasswordDialog}
        onClose={() => setIsShowChangePasswordDialog(false)}
      >
        <ChangePasswordForm onSubmitted={() => setIsShowChangePasswordDialog(false)} />
      </FormDialog>
    </AuthLayout>
  );
};

export default withAuth(SettingsPage);
