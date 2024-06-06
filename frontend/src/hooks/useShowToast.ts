import { useToast } from "@chakra-ui/react";

type Status = "info" | "warning" | "success" | "error" | "loading" | undefined;
export const useShowToast = () => {
  const toast = useToast();
  const showToast = (msg: string, status: Status) => {
    toast({
      title: msg,
      status,
      variant: "left-accent",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };
  return showToast as (msg: string, status: Status) => void;
};
