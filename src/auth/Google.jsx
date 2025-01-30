import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { storeUser } from "../Helper";
import { useNavigate } from "react-router-dom";
export const GoogleSignUp = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account/google-login/",
        {
          token: credentialResponse.credential,
        }
      );
      if (response.status === 200) {
        console.log("Login Success:", response.data);
        storeUser(response.data);
        if (response?.data?.user?.phone == null) {
          navigate("/verify-number");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="mt-5">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
