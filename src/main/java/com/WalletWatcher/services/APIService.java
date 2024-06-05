package com.WalletWatcher.services;

import org.json.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.json.JSONObject;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URI;
import java.nio.charset.StandardCharsets;


@RestController
@RequestMapping("/")
public class APIService {
	private static final String CMC_PRO_API_KEY = "46614896-1f3a-4c8b-b463-15d2314c3b2e";
	private static final String topFiveCMCCryptoURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=";
	public static enum Constants {
		TOP_CURRENCIES_AMOUNT(5);

		private int value;
		private Constants(int value) {
			this.value = value;
		}
	}

	public APIService() {

	}

	@GetMapping("/getTopFiveCMCCrypto")
	public String getList() throws IOException, URISyntaxException {
		URL url = new URI(STR."\{topFiveCMCCryptoURL}\{CMC_PRO_API_KEY}").toURL();
		String json = IOUtils.toString(url, StandardCharsets.UTF_8);

		JSONArray dataArray = new JSONObject(json).getJSONArray("data");
		JSONArray responseJSONArray = new JSONArray();

		for (int i = 0; i < Constants.TOP_CURRENCIES_AMOUNT.value; i++) {
			JSONObject dataObject = dataArray.getJSONObject(i);


			JSONObject attributeUSD = dataObject.getJSONObject("quote").getJSONObject("USD");
			JSONObject objectJSON = new JSONObject();

			objectJSON.put("name", dataObject.getString("name"));
			objectJSON.put("ticker", dataObject.getString("symbol"));
			objectJSON.put("rank", dataObject.getInt("cmc_rank"));
			objectJSON.put("price", attributeUSD.getFloat("price"));
			objectJSON.put("priceChange24h", attributeUSD.getFloat("percent_change_24h"));

			responseJSONArray.put(objectJSON);
		}

		return responseJSONArray.toString();
	}

}