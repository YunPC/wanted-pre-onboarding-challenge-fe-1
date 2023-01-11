import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import TokenLocalStorage from "../../utils/localStorage/tokenLocalStorage";
import { useRouter } from "next/router";
import axios from "axios";
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

export default function SignIn() {
  const router = useRouter();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
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
        "http://localhost:8080/users/login",
        {
          ...loginData,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const tokenStorage = new TokenLocalStorage();
        tokenStorage.setToken(response.data.token);
        toast.update(loadingToastId, {
          render: "로그인에 성공하였습니다.",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.replace("/");
      })
      .catch(() => {
        toast.update(loadingToastId, {
          render: "로그인에 실패하였습니다.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };
  const canSubmit =
    !!loginData.email && !!loginData.password && !emailError && !passwordError;

  const route = useRouter();

  useEffect(() => {
    const tokenStorage = new TokenLocalStorage();
    if (tokenStorage.getToken()) {
      route.replace("/");
    }
  }, [route]);

  return (
    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="이메일"
            autoFocus
            error={emailError}
            helperText={emailError && "이메일 형식이 올바르지 않습니다."}
            onChange={(e) => {
              setLoginData((prevLoginData) => ({
                ...prevLoginData,
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
              setLoginData((prevLoginData) => ({
                ...prevLoginData,
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
            로그인
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/sign-up" variant="body2">
                회원 가입 화면으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
