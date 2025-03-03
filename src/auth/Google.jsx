import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { storeUser } from "../Helper";
import { post } from "../servic";
export const GoogleSignUp = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    const response = await post("/account/google-login/", {
      token: credentialResponse.credential,
    });

    if (response.status === 200) {
      if (response?.data?.verify === false) {
        localStorage.setItem("otpAccessCode", response?.data?.access_token);
        toast.success(response?.data?.message);
        navigate("/number");
      } else {
        navigate("/");
        const data = {
          data: {
            uid: response.data?.user?.uid,
            name: response.data?.user?.name,
          },
          access_token: response.data?.access_token,
          refresh_token: response.data?.refresh_token,
        };
        storeUser(data);
      }
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider
      className="w-full m-auto"
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <div className="mt-5 w-full">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
