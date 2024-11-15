"use client";

import ConfirmLogoutModal from "@/components/(settings)/confirm-logout-modal";
import { Button } from "@/components/ui/primitives/button";

const LogoutFlow = ({
  showConfirmLogoutModal,
  setShowConfirmLogoutModal,
}: any) => {
  return (
    <>
      <div className="flex flex-col gap-4 border-2 rounded-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Do you want to logout??</div>
            <div className="text-slate-500 text-sm">
              This will log you out, however you can always log in again with
              same credentials to be back in action! Proceed with caution
            </div>
          </div>
          <Button
            onClick={() => setShowConfirmLogoutModal(true)}
            variant="destructive"
            size="sm"
          >
            Logout
          </Button>
        </div>
      </div>

      <ConfirmLogoutModal
        show={showConfirmLogoutModal}
        setShow={setShowConfirmLogoutModal}
        showCats={true}
        ctaBtnText="I promise to comeback soon, please give a virtual hug to cats and log me out!"
        screenTitle="Wait! Before you go... 🐾"
        screenDescription="We're just a bunch of humble cats, but we thought we'd ask... could you stay a little longer? We've got all these cozy corners and warm vibes, and honestly, it's just not the same without you here. But if you really must go, promise you'll come back soon? We'll be here, purring patiently and counting the seconds. 💖"
        screenHeader="Request from cats and witches:"
      />
    </>
  );
};

export default LogoutFlow;
