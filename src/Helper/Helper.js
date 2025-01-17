import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      userName: data.username,
      token: data.token,
    })
  );
};

export const userData = () => {
  const stringifedUser = localStorage.getItem("user") || "";
  return JSON.parse(stringifedUser || {});
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();
  const { token } = userData();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
};
