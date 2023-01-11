import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import TokenLocalStorage from "../../utils/localStorage/tokenLocalStorage";
import { toast } from "react-toastify";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const validateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };
  const validatePassword = (password: string) => password.length >= 8;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToastId = toast.loading("로그인 중입니다.");
    axios
      .post<{
        message: string;
        token: string;
      }>(
        "http://localhost:8080/users/create",
        {
          ...signUpData,
        },
        { withCredentials: true }
      )
      .then((value) => {
        toast.update(loadingToastId, {
          render: "회원 가입에 성공하였습니다!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        const tokenStorage = new TokenLocalStorage();
        tokenStorage.setToken(value.data.token);
        router.replace("/");
      })
      .catch(() => {
        toast.update(loadingToastId, {
          render: "회원가입에 실패하였습니다.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);

  const canSubmit =
    !!signUpData.email &&
    !!signUpData.password &&
    !emailError &&
    !passwordError;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#8687E7" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError && "이메일 형식이 올바르지 않습니다."}
              onChange={(e) => {
                setSignUpData((prevSignUpData) => ({
                  ...prevSignUpData,
                  email: e.target.value,
                }));
                setEmailError(!validateEmail(e.target.value));
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError && "비밀번호 형식이 올바르지 않습니다."}
              onChange={(e) => {
                setSignUpData((prevSignUpData) => ({
                  ...prevSignUpData,
                  password: e.target.value,
                }));
                setPassWordError(!validatePassword(e.target.value));
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#8687E7" }}
              disabled={!canSubmit}
            >
              회원가입
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  로그인 화면으로 이동하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
