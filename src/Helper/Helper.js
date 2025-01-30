import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      uid: data?.user?.uid,
      name: data?.user?.name,
      access_green: data.access_green,
      refresh_green: data.refresh_green,
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
