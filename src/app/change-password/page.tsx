"use client";

import { useState, Suspense } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
// import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const searchParams = useSearchParams();
  const [currentPassword, setCurrentPassword] = useState("");

  // const token = searchParams.get("token");

  const handleSubmit = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.warning("⚠️ Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("⚠️ Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!currentPassword) {
      toast.warning("⚠️ Vui lòng nhập mật khẩu hiện tại.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "❌ Lỗi khi đổi mật khẩu.");
      }

      toast.success("✅ Mật khẩu đã được thay đổi thành công.");
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "❌ Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" mb={3}>
          Đặt lại mật khẩu
        </Typography>
        {submitted ? (
          <>
            <Typography color="primary" mb={2}>
              Mật khẩu của bạn đã được thay đổi. Bạn có thể đăng nhập lại.
            </Typography>
            <Button
              variant="outlined"
              href="/user/home" // hoặc '/login' tùy cấu trúc route của bạn
            >
              Quay về trang chat
            </Button>
          </>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              type="password"
              label="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              disabled={loading}
            />

            <TextField
              type="password"
              label="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              disabled={loading}
            />

            <TextField
              type="password"
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              disabled={loading}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Xác nhận đổi mật khẩu"}
            </Button>
          </Box>
        )}

      </Container>
    </Suspense>
  );
}
