import { useEffect, useState, type FC } from "react";
import Button from "../components/Button";
import IpTable from "../components/IpTable";
import { useAccount } from "wagmi";
import { useFaucetRequestEther } from "./wagmi.generated";
import shortAddr from "../utils/shortAddr";
import Countdown from "../components/Countdown";

interface RequestEtherProps {}

const RequestEther: FC<RequestEtherProps> = () => {
  /* Gestion visuelle de la demande d'Ether */
  const [ipAddress, setIPAddress] = useState("");
  const [clickRecords, setClickRecords] = useState<{ [ip: string]: Date }>({});
  const [buttonClass, setButtonClass] = useState("w-full");

  /* Gestion de la connexion */
  const { isConnected, address } = useAccount();
  const { write } = useFaucetRequestEther();

  /* Gestion des enregistrements de clics */
  const addClickRecord = (ip: string, timestamp: Date) => {
    setClickRecords((prevClickRecords) => ({
      ...prevClickRecords,
      [ip]: timestamp,
    }));
  };

  useEffect(() => {
    /* Récupérer l'adresse IP */
    fetch("https://geolocation-db.com/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch IP address");
        }
        return response.json();
      })
      .then((data) => {
        setIPAddress(data.IPv4);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'adresse IP", error);
      });
  }, []);

  /* Gestion de la demande d'Ether */
  const handleRequestEther = () => {
    const existingRecord = clickRecords[ipAddress];
    const duration = 60; // en minutes

    if (existingRecord) {
      // Si l'adresse IP est déjà présente, vérifier la différence de temps
      const currentTime = new Date();
      const lastRequestTime = new Date(existingRecord.getTime());
      const timeDifference =
        Math.abs(currentTime.getTime() - lastRequestTime.getTime()) /
        (60 * 1000); // en minutes

      // Si la différence est inférieure à 60 minutes, ne pas autoriser la demande
      if (timeDifference < duration) {
        return;
      }
    }
    setButtonClass("w-full bg-gray-400 cursor-not-allowed");

    if (isConnected && address) {
      try {
        write?.();
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => {
        setButtonClass("w-full");
      }, duration * 60 * 1000);
      addClickRecord(ipAddress, new Date());
    }
  };

  return (
    <>
      <IpTable ipAddress={ipAddress} clickRecords={clickRecords} />
      <div className="flex items-center justify-center flex-grow">
        <div className="min-w-[400px] border border-gray-400 rounded">
          <div className="p-4">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="mb-4 text-xl font-bold">Request Ether</p>
              {isConnected && address && ipAddress ? (
                <>
                  <p className="mb-4 text-lg">
                    Request Ether from the Rinkeby Faucet for your address{" "}
                    {shortAddr(address)}
                  </p>
                  <Button
                    className={buttonClass}
                    onClick={() => {
                      handleRequestEther();
                    }}
                  >
                    Request Ether
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    You can request Ether every 60 minutes
                  </p>
                  <Countdown isCounting={buttonClass === "w-full bg-gray-400 cursor-not-allowed"}
                    time={60}
                  />
                </>
              ) : (
                <>
                  <p className="mb-4 text-lg">
                    Connect to request Ether or wait ip address
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestEther;
