
// "use client";

// import GoogleIcon from "@mui/icons-material/Google";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Divider,
//   FormControlLabel,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useUserLogin } from "@/src/services/hooks/hookAuth";
// import { setAuthCookies } from "@/src/lib/helper/token";
// import { getUserRole } from "@/src/lib/helper";
// import { ROLE_VALUE } from "@/src/config/const";

// const LoginPage = () => {
//   const { postUserLogin } = useUserLogin();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const [isloading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

// const handleLogin = async () => {
//   // e.preventDefault();
//   setIsLoading(true);
//   try {
//     const res = await postUserLogin({
//       email: form.email,
//       password: form.password,
//     });

//     console.log(res.data);
//     console.log(res.data.force_password_change)
//     if (res?.data?.access_token) {
//       // ✅ Set cookies
//       setAuthCookies(res.data.access_token, res.data.refresh_token);
//       Cookies.set(ROLE_VALUE, res.data.role);

//       const savedRole = getUserRole();

//       // ✅ Kiểm tra force_password_change
//       if (res.data.force_password_change === true) {
//         router.push("/change-password");
//         toast.info("Bạn đang sử dụng mật khẩu tạm thời. Vui lòng đổi mật khẩu.");
//         // router.push("/change-password");
//         return; // ⚠️ Không redirect tiếp phía dưới
//       }

//       toast.success("Đăng nhập thành công!");

//       if (savedRole === "admin") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/");
//       }
//     } else {
//       toast.error(res.data?.detail || "Đăng nhập thất bại!");
//     }
//   } catch (err: any) {
//     toast.error(err.response?.data?.detail || "Đăng nhập thất bại!");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
//           <Typography variant="h5" align="center" fontWeight={600}>
//             Đăng nhập
//           </Typography>

//           <Box component="form" sx={{ mt: 3 }}>
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               variant="outlined"
//               margin="normal"
//               placeholder="nguyenvana@email.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />

//             <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <TextField
//                 fullWidth
//                 label="Mật khẩu"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 variant="outlined"
//                 margin="normal"
//                 placeholder="Nhập mật khẩu"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <Button
//                 type="button"
//                 onClick={() => setShowPassword((show) => !show)}
//                 sx={{
//                   position: "absolute",
//                   right: 0,
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   minWidth: "40px",
//                   color: "grey.600",
//                 }}
//                 aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
//               >
//                 {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//               </Button>
//             </Box>

//             <FormControlLabel
//               control={<Checkbox />}
//               label="Ghi nhớ đăng nhập"
//               sx={{ mt: 1 }}
//             />

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               {/* <button
//                 // type="submit"
//                 // fullWidth
//                 // variant="contained"
//                 // color="error"
//                 // sx={{ mt: 2, py: 1.5 }}
//                 className="ta"
//                 disabled={isloading}
//                 onClick={handleLogin}
//               >
//                 {isloading ? "Đang đăng nhập..." : "Đăng Nhập"}
//               </button> */}
//               <button
//                 disabled={isloading}
//                 onClick={handleLogin}
//                 className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300 ${
//                   isloading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {isloading ? "Đang đăng nhập..." : "Đăng Nhập"}
//               </button>
//             </motion.div>

//             <Typography
//               variant="body2"
//               align="center"
//               sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
//               onClick={() => router.push("/forgot-password")}
//             >
//               Quên mật khẩu?
//             </Typography>

//             <Divider sx={{ my: 3 }}>hoặc</Divider>

//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<GoogleIcon />}
//               sx={{ mb: 2, textTransform: "none" }}
//               onClick={() => toast.info("Chức năng đăng nhập Google đang phát triển")}
//             >
//               Đăng nhập với Google
//             </Button>

//             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//               Bạn chưa có tài khoản?{" "}
//               <Box
//                 component="span"
//                 sx={{ color: "primary.main", cursor: "pointer" }}
//                 onClick={() => router.push("/register")}
//               >
//                 Đăng ký ngay
//               </Box>
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Container>
//   );
// };

// export default LoginPage;
"use client";

import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUserLogin } from "@/src/services/hooks/hookAuth";
import { setAuthCookies } from "@/src/lib/helper/token";
import { getUserRole } from "@/src/lib/helper";
import { ROLE_VALUE } from "@/src/config/const";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { postUserLogin } = useUserLogin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await postUserLogin({
        email: form.email,
        password: form.password,
      });

      console.log(res.data);
      console.log(res.data.force_password_change)
      if (res?.data?.access_token) {
        setAuthCookies(res.data.access_token, res.data.refresh_token);
        Cookies.set(ROLE_VALUE, res.data.role);

        const savedRole = getUserRole();

        if (res.data.force_password_change === true) {
          router.push("/change-password");
          toast.info("Bạn đang sử dụng mật khẩu tạm thời. Vui lòng đổi mật khẩu.");
          return;
        }

        toast.success("Đăng nhập thành công!");

        if (savedRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.data?.detail || "Đăng nhập thất bại!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Đăng nhập thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h5" align="center" fontWeight={600}>
            Đăng nhập
          </Typography>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              placeholder="nguyenvana@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "40px",
                  color: "grey.600",
                }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            </Box>

            <FormControlLabel
              control={<Checkbox />}
              label="Ghi nhớ đăng nhập"
              sx={{ mt: 1 }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                disabled={isloading}
                onClick={handleLogin}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300 ${isloading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isloading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </button>
            </motion.div>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
              onClick={() => router.push("/forgot-password")}
            >
              Quên mật khẩu?
            </Typography>

            <Divider sx={{ my: 3 }}>hoặc</Divider>

            {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const idToken = credentialResponse.credential;
                  try {
                    const res = await axios.post(
                      `${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/google`,
                      { id_token: idToken }
                    );
                    if (res?.data?.access_token) {
                      setAuthCookies(res.data.access_token, res.data.refresh_token);
                      Cookies.set(ROLE_VALUE, res.data.role);

                      toast.success("Đăng nhập Google thành công!");
                      const role = getUserRole();

                      if (res.data.force_password_change === true) {
                        router.push("/change-password");
                      } else if (role === "admin") {
                        router.push("/admin/dashboard");
                      } else {
                        router.push("/");
                      }
                    } else {
                      toast.error("Không lấy được access_token từ server!");
                    }
                  } catch (error: any) {
                    toast.error(error?.response?.data?.detail || "Lỗi xác thực Google");
                  }
                }}
                onError={() => toast.error("Đăng nhập Google thất bại")}
                useOneTap
              />
            </Box> */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const idToken = credentialResponse.credential;
                  if (!idToken) {
                    toast.error("Không lấy được token từ Google!");
                    return;
                  }

                  try {
                    const res = await axios.post(
                      `${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/google`,
                      { id_token: idToken }
                    );

                    const data = res.data;

                    if (data?.access_token) {
                      setAuthCookies(data.access_token); // ✅ Không cần refresh_token
                      Cookies.set(ROLE_VALUE, data.role); // Lưu role

                      toast.success("Đăng nhập Google thành công!");

                      // ✅ Delay nhẹ để đảm bảo cookie đã được set
                      setTimeout(() => {
                        const role = getUserRole();

                        if (data.force_password_change === true) {
                          router.push("/change-password");
                        } else if (role === "admin") {
                          router.push("/admin/dashboard");
                        } else {
                          router.push("/");
                        }
                      }, 100);
                    } else {
                      toast.error("Không lấy được access_token từ server!");
                    }
                  } catch (error: any) {
                    toast.error(error?.response?.data?.detail || "Lỗi xác thực Google");
                  }
                }}
                onError={() => toast.error("Đăng nhập Google thất bại")}
                
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản?{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => router.push("/register")}
              >
                Đăng ký ngay
              </Box>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                color: "primary.main",
                cursor: "pointer",
                transition: "all 0.3s ease",
                '&:hover': { color: '#1F2251' }
              }}
              onClick={() => router.push("/user/home")}
            >
              <ArrowLeftIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
              Trang chủ
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default LoginPage;