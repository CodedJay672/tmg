"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { downloadFile } from "@/lib/actions/user.actions";
import { downloadToMachine } from "@/lib/utils";
import { AppwriteException } from "node-appwrite";

const DownloadDatasheetButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await downloadFile(id);

      if ("status" in res && !res.status) return toast.error(res.message);

      toast.success("File download has started.");
      downloadToMachine(res as ArrayBuffer);
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={loading}
      onClick={handleClick}
      className="w-full text-primary font-medium border border-primary bg-foreground"
    >
      {loading ? "Downloading..." : "Download Datasheet"}
    </Button>
  );
};

export default DownloadDatasheetButton;
