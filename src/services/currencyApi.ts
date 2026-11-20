const BASE_URL = 'https://api.frankfurter.dev/v1';

export interface ExchangeRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Нақты уақыттағы валюта бағамдарын алу (әдепкі бойынша USD-ге қатысты)
export const getLatestRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRatesResponse> => {
  const response = await fetch(`${BASE_URL}/latest?base=${baseCurrency}`);
  if (!response.ok) {
    throw new Error('Валюта бағамдарын жүктеу сәтсіз аяқталды');
  }
  return await response.json();
};