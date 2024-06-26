import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import LoginLogo from "src/assets/images/company-logo-Ai.png"

const SignInView = ({
  email = "",
  password = "",
  handleFieldChange = () => { },
  handleLogin = () => { }
}) => {
  const { t } = useTranslation();
  const styles = {
    loginBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(https://dev.3sc.ai/static/media/login-bg.baf6338ce52d3c84de4d.jpg)`,
      backgroundSize: "cover",
      backgroundRepeat: "none",
      backgroundPosition: "center",
      height: "100vh",
      padding: "5%"
    },
    paper: {
      width: "100%",
      minHeight: "50%",
      maxHeight: "90%",
      backgroundColor: "#c9ccd9",
      borderRadius: "20px",
      zIndex: 2,
      boxShadow: "0px 2px 2px rgb(0 0 0 / 30%)"
    },
    loginButton: { borderRadius: 2, mb: 2, mt: 3, textTransform: "none", padding: "1 3%" }
  }
  return (
    <Box
      sx={styles.loginBox}
    >
      <Box>
        <Paper
          sx={styles.paper}
        >
          <Box
            sx={{
              paddingTop: "15%",
              pb: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="lgoin3scLogo" >
              <img src={LoginLogo} width={100}
                height={100}
                alt={t("loginLogo")} />
            </div>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                color="primary.light"
                sx={{ fontWeight: "bold" }}
              >
                {t("logIn")}
              </Typography></Box>

            <TextField
              value={email}
              onChange={handleFieldChange}
              label={t("enterUserName")}
              name="email"
              placeholder={t("userName")}
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              sx={{ mb: 2, borderRadius: 9 }}
            />

            <TextField
              type="password"
              value={password}
              onChange={handleFieldChange}
              label={t("enterPassword")}
              name="password"
              placeholder={t("password")}
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleLogin}
              size="large"
              sx={styles.loginButton}
              disabled={!email.length || !password.length}
            >
              {t("login")}
            </Button>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

export default SignInView;
