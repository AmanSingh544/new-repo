import React from 'react';
import { Grid, Paper } from '@mui/material';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        root: {
            flexGrow: 1,
        },
    }),
);

export default function Footer() {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div sx={{ width: '100%', height: '30%', backgroundColor: 'black', padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} sm={12}>
                    <Paper className={classes.paper}>
                        <div>{t("facebook")}</div>
                        <div>{t("twitter")}</div>
                        <div>{t("youtube")}</div>
                        <div>{t("instagram")}</div>
                        <div>{t("googlePlaystore")}</div>
                        <div>{t("apple")}</div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                    <Paper className={classes.paper}>
                        {t("privacyPolicyRefundPolicyTermsOfUse")}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                    <Paper className={classes.paper}>
                        &copy; {t("academyIasPvtLtd")}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}