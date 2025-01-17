import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import Logo from "../../assets/Logo/Logo.png";
import { Link } from "react-router-dom";
export const Footer = () => {
  const CurrentYear = new Date().getFullYear();
  return (
    <div className="px-4 py-10 md:py-20 md:px-14 lg:px-34 xl:px-44 bg-black-500 text-white-500 flex flex-wrap justify-between  gap-6">
      <div>
        <div className="w-[220px] h-20">
          <img src={Logo} alt="" />
        </div>
        <p className="text-white-400">© {CurrentYear} GreenBowl Limited</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white-500 text-xl font-semibold">Company</h1>
        <p className="text-[16px] text-white-400">About Us</p>
        <p className="text-[16px] text-white-400">Team</p>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-white-500 text-xl font-semibold">Legal</h1>
        <p className="text-[16px] text-white-400">Terns & Conditions</p>
        <p className="text-[16px] text-white-400">Privacy Policy</p>
        <p className="text-[16px] text-white-400">cookie-policy</p>
        <p className="text-[16px] text-white-400">Help & Support</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-white-500 text-xl font-semibold">
          Connect with Us:
        </h1>
        <div className="flex gap-4 mt-4">
          <Link
            to="https://www.facebook.com/tariksiddique.siddique.5/"
            target="_blank"
          >
            <FacebookIcon style={{ width: "36px", height: "36px" }} />
          </Link>
          <Link
            to="https://www.instagram.com/__tariqsiddique__/"
            target="_blank"
          >
            <InstagramIcon style={{ width: "36px", height: "36px" }} />
          </Link>{" "}
          <Link
            to="https://www.linkedin.com/in/tarik-ali-48bb1b228/"
            target="_blank"
          >
            <LinkedInIcon style={{ width: "36px", height: "36px" }} />
          </Link>{" "}
          <Link to="https://x.com/TarikAli1836669" target="_blank">
            <XIcon style={{ width: "36px", height: "36px" }} />
          </Link>
          <Link to="https://github.com/tarikali786/" target="_blank">
            <GitHubIcon style={{ width: "36px", height: "36px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};
