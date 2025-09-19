import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ErrorComp({children} : {children: string}) {  
  return (
    <div className="flex justify-center items-center h-64">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircleIcon className="h-5 w-5 text-[var(--destructive)]" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Impossible de charger les données : <span className="font-semibold">{children}</span>
        </AlertDescription>
      </Alert>
    </div>
  );
}