"use client";

import { useChatAdmin, useChatStudent } from "@/src/services/hooks/hookChat";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LoadingDots from "../LoadingDot";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text:
        "Xin chào, tôi là trợ lý ảo của trường Đại học Văn Lang. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const { postChatStudent } = useChatStudent();
  const { postChatAdmin } = useChatAdmin();


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setChatMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
    setInputText("");
    setLoading(true);

    try {
      let res;
      const token = Cookies.get("access_token");
      if (token) {
        res = await postChatStudent({ question: trimmed });
      } else {
        res = await postChatAdmin({ question: trimmed });
      }

      setChatMessages((prev) => [
        ...prev,
        { text: res.data.answer, sender: "bot" },
      ]);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
      setChatMessages((prev) => [
        ...prev,
        { text: "Lỗi khi gửi tin nhắn.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => { inputRef.current?.focus() }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <>
      <motion.button
        className="bg-[#B02E35] rounded-full w-14 h-14 fixed bottom-5 right-5 md:z-[1403] z-[1401] flex items-center justify-center"
        onClick={() => setIsVisible((v) => !v)}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        aria-label="Mở / đóng chat"
        
      >
        {isVisible ? (
          <CancelIcon sx={{ color: "#fff" }} />
        ) : (
          <Image src="/chatbot.png" alt="Chatbot Logo" width={1000} height={1000} />
        )}
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <>
            <Backdrop
              open
              sx={{ zIndex: 1401, bgcolor: "rgba(0,0,0,0.25)" }}
              onClick={() => setIsVisible(false)}
            />

            <motion.div
              key="chatbox"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className={`fixed z-[1402] inset-0 flex items-center justify-center`}
            >
              <Box
                className="w-11/12 lg:w-[90%] h-[80vh] lg:h-[80%] bg-white rounded-2xl shadow-2xl flex flex-col"
                sx={{ overflow: "hidden" }}
              >
                <Box
                  sx={{
                    bgcolor: "#B02E35",
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
                      VANLANG
                    </Typography>
                    <Typography
                      sx={{
                        bgcolor: "#4388FF",
                        color: "#fff",
                        px: 2,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      BETA
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setIsVisible(false)}
                    sx={{ color: "#fff" }}
                    aria-label="Đóng chat"
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#f5f5f5" }}
                >
                  {chatMessages.map((m, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: m.sender === "user" ? "#C1272D" : "#C4C4C4",
                          color: m.sender === "user" ? "#fff" : "#000",
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          maxWidth: "80%",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.8 }}>
                          {m.sender === "user" ? "You" : "Bot"}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>{m.text}</Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={bottomRef} />

                  {loading && (
                    <Box
                      sx={{ width: 80, borderRadius: 2, bgcolor: "#C4C4C4", px: 2, py: 1 }}
                    >
                      <LoadingDots />
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderTop: "1px solid #ddd",
                  }}
                >

                  <TextareaAutosize
                  
                    placeholder="Nhập câu hỏi của bạn..."
                    style={{
                      flex: 1,
                      minHeight: 32,
                      borderRadius: 8,
                      padding: 8,
                      borderColor: "#ddd",
                      resize: "none",
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                    minRows={1}
                    maxRows={3}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    ref={inputRef}
                    color="black"
                  />

                  <Box
                    sx={{
                      bgcolor: "#B02E35",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onClick={() => !loading && handleSend()}
                    aria-label="Gửi câu hỏi"
                  >
                    {loading ? (
                      <CircularProgress size={20} sx={{ color: "#fff" }} />
                    ) : (
                      <SendIcon sx={{ color: "#fff" }} />
                    )}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
