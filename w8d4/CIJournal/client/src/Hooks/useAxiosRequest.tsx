import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { useState } from "react";

export interface AxiosRequestParams {
	url: string;
	method: Method;
	data?: any;
}

type AxiosHookResponse = {
	makeRequest: (req: AxiosRequestParams) => void;
	response: any | null;
	error: AxiosError | null;
	isLoading: boolean;
};

const useAxiosRequest = (): AxiosHookResponse => {
	const [response, setResponse] = useState<any | null>(null);
	const [error, setError] = useState<AxiosError | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const makeRequest = async (params: AxiosRequestParams): Promise<void> => {
		const { url, method, data } = params;
		try {
			setIsLoading(true);
			setError(null);
			const result: AxiosResponse = await axios({ url, method, data });
			setResponse(result);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error);
				setIsLoading(false);
			}
		}
	};

	return { makeRequest, response, error, isLoading };
};

export default useAxiosRequest;
