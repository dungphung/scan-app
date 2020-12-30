import { useState, useEffect, useCallback } from "react";

import { LocalStoreImages } from "@models/localStoreImages";
import { initScanbotSdk } from "@utils/initScanbotSdk";
import { getIntroAppStatus } from "@models/localStoreIntroApp";

const useCheckAppReady = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [introAppStatus, setIntroAppStatus] = useState<String | null>("");

  useEffect(() => {
    checkAppReady();
  });

  const checkAppReady = useCallback(async () => {
    await LocalStoreImages.shared.init();
    await initScanbotSdk();
    const status = await getIntroAppStatus();
    setIsAppReady(true);
    setIntroAppStatus(status);
  }, []);

  return [isAppReady, introAppStatus, setIntroAppStatus];
};

export { useCheckAppReady };

export default {
  useCheckAppReady,
};
