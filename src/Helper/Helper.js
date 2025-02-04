import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      uid: data?.data?.uid,
      name: data?.data?.name,
      access_green: data.access_token,
      refresh_green: data.refresh_token,
    })
  );
};

export const userData = () => {
  const stringifedUser = localStorage.getItem("user") || ' "" ';
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
