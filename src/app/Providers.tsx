
"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client=new QueryClient();

export default function Providers({children}:{children:React.ReactNode}){
  return(
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
