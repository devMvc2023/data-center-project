import { GetOne } from "api";
import LoadingPage from "component/element/loading";
import useProfile from "hooks/useProfile";
import { NeedUser, NotFound } from "page/brower-error";
import Demo from "page/demo";
import Member from "page/member";
import Notify from "page/notify";
import { OTPpassword, ChangePassword, ComparePassword } from "page/password";
import PublicRelations from "page/public-relations";
import Rehersal from "page/rehearsal";
import Settings from "page/settings";
import Statistics from "page/statistics";
import Team from "page/team";
import User from "page/user";
import Login from "page/user-login";
import Signup from "page/user-signup";
import UserSettings from "page/user/edit";
import { useEffect, useState } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Cookies from "universal-cookie";

function Router() {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  const { profile, setProfile } = useProfile();

  useEffect(() => {
    const token = cookies.get("_token_");

    const getProfile = async () => {
      setLoading(true);

      let data = [];

      data = await GetOne("user", token);

      setProfile({ ...data });
      setLoading(false);
    };

    if (token && !profile) getProfile();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage loading={loading} />
      ) : (
        <Switch>
          <Route path="/settings" element={<Settings />} />

          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:signup_status" element={<Signup />} />
          <Route path="/change-password" element={<ComparePassword />} />
          <Route path="/change-password/:path" element={<ChangePassword />} />
          <Route path="/forget-password" element={<OTPpassword />} />
          <Route path="/rehearsal" index element={<Rehersal />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/organizing-team" element={<Team />} />
          <Route path="/public-relations" element={<PublicRelations />} />

          {profile?.data_id ? (
            <>
              {profile?.data_id && profile?.role !== "member" ? (
                <Route path="/member" element={<Member />} />
              ) : (
                <Route path="*" element={<NotFound />} />
              )}

              {(profile?.role === "super admin" || profile?.allow_work) && (
                <Route path="/settings" element={<Settings />} />
              )}

              <Route path="/" element={<Rehersal />} />
              <Route path="/user/:user_id/account" element={<User />} />
              <Route
                path="/user/:user_id/account/edit"
                element={<UserSettings />}
              />
              <Route path="/notify" element={<Notify />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Rehersal />} />
              <Route path="*" element={<NeedUser />} />
            </>
          )}
        </Switch>
      )}
    </>
  );
}

export default Router;
