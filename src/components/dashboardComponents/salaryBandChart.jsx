import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Info,
  RefreshCw,
  AlertTriangle,
  Globe,
} from "lucide-react";

// Import utilities
import {
  getCountryData,
  getAllCountries,
  getPopularCountries,
  formatCurrency as formatCurrencyUtil,
  getCurrencySymbol,
} from "../../lib/countryUtils";

const SalaryBandChart = ({ apiData, onRegionChange }) => {
  // Extract data from API
  const {
    salary = {},
    premiumInsights = {},
    region: apiRegion = "remote",
  } = apiData || {};

  const { salaryPercentiles = {} } = premiumInsights;

  // 🔥 DYNAMIC: Get current region data from API using NPM package
  const currentRegionData = useMemo(() => {
    return getCountryData(apiRegion);
  }, [apiRegion]);

  // 🔥 DYNAMIC: Get all available countries
  const availableCountries = useMemo(() => {
    const popular = getPopularCountries();
    const all = getAllCountries();

    return [
      {
        value: "popular-header",
        label: "🌟 Popular Markets",
        disabled: true,
        isHeader: true,
      },
      ...popular,
      {
        value: "divider",
        label: "──────────────",
        disabled: true,
        isDivider: true,
      },
      {
        value: "all-header",
        label: "🌍 All Countries",
        disabled: true,
        isHeader: true,
      },
      ...all,
    ];
  }, []);

  // Selected region state
  const [selectedRegion, setSelectedRegion] = useState(
    currentRegionData?.value
  );

  // Get selected region data
  const selectedRegionData = useMemo(
    () => getCountryData(selectedRegion),
    [selectedRegion]
  );

  // Check if user selected different region
  const isDifferentRegion = selectedRegion !== currentRegionData?.value;

  // Process salary data from API
  const salaryData = useMemo(() => {
    const {
      min = 0,
      max = 0,
      desired = 0,
      currency = currentRegionData?.currency,
      confidence = 75,
    } = salary;

    const {
      p25 = min,
      p50 = desired,
      p75 = max,
      currency: percentileCurrency,
    } = salaryPercentiles;

    return {
      min: p25 || min,
      median: p50 || desired || Math.round((min + max) / 2),
      max: p75 || max,
      desired: desired || p50,
      currency: percentileCurrency || currency || currentRegionData?.currency,
      confidence: confidence,
    };
  }, [salary, salaryPercentiles, currentRegionData?.currency]);

  // Confidence level assessment
  const getConfidenceLevel = (confidence) => {
    if (confidence >= 85)
      return {
        label: "Excellent",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-800",
        dotColor: "bg-emerald-500",
      };
    if (confidence >= 70)
      return {
        label: "Good",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        dotColor: "bg-green-500",
      };
    if (confidence >= 55)
      return {
        label: "Fair",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        dotColor: "bg-blue-500",
      };
    if (confidence >= 40)
      return {
        label: "Low",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        dotColor: "bg-yellow-500",
      };
    return {
      label: "Very Low",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      dotColor: "bg-red-500",
    };
  };

  const confidenceLevel = getConfidenceLevel(salaryData?.confidence);

  // 🔥 DYNAMIC: Format currency using NPM package
  const formatCurrency = (
    amount,
    currencyCode = currentRegionData?.currency
  ) => {
    if (!amount) {
      const symbol = getCurrencySymbol(currencyCode);
      return `${symbol}0`;
    }
    return formatCurrencyUtil(amount, currencyCode);
  };

  // Handle region change
  const handleRegionChange = (newRegion) => {
    if (
      newRegion === "divider" ||
      newRegion === "popular-header" ||
      newRegion === "all-header"
    ) {
      return;
    }
    setSelectedRegion(newRegion);
  };

  // Handle re-analysis
  const handleReAnalysis = () => {
    if (onRegionChange) {
      onRegionChange(selectedRegion);
    }
  };

  // Calculate target position percentage for visualization
  const targetPosition = useMemo(() => {
    if (!salaryData?.desired || !salaryData?.min || !salaryData?.max) return 50;
    const range = salaryData?.max - salaryData?.min;
    if (range === 0) return 50;
    return ((salaryData?.desired - salaryData?.min) / range) * 100;
  }, [salaryData?.desired, salaryData?.min, salaryData?.max]);

  // Check if desired salary is within range
  const isWithinRange =
    salaryData?.desired >= salaryData?.min &&
    salaryData?.desired <= salaryData?.max;

  return (
    <TooltipProvider>
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
            <DollarSign className="h-5 w-5 text-green-600" aria-hidden="true" />
            Expected Salary Range
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-auto"
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Salary information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs space-y-2">
                  <p className="text-gray-700 font-medium">
                    Salary range based on your skills, experience and market
                    data
                  </p>
                  <div className="text-xs space-y-1 bg-gray-50 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-semibold">
                        {salaryData?.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market:</span>
                      <span className="font-semibold">
                        {currentRegionData?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-semibold">
                        {currentRegionData?.currency} (
                        {currentRegionData?.symbol})
                      </span>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>
              Market analysis for{" "}
              <span className="font-semibold text-gray-800">
                {currentRegionData?.label}
              </span>{" "}
              ({currentRegionData?.currency})
            </span>
          </div>
        </CardHeader>

        <CardContent>
          {/* Country/Region Selector */}
          <div className="mb-6">
            <div className="space-y-2">
              <Label
                htmlFor="region-select"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Globe className="h-4 w-4" />
                Select Target Market:
              </Label>
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger id="region-select" className="w-full">
                  <SelectValue placeholder="Select a country or region" />
                </SelectTrigger>
                <SelectContent>
                  {availableCountries?.map((country) => (
                    <SelectItem
                      key={country?.value}
                      value={country?.value}
                      disabled={country?.disabled}
                      className={
                        country?.isHeader
                          ? "font-bold text-gray-700 bg-gray-50"
                          : country?.isDivider
                          ? "text-gray-300 cursor-default"
                          : ""
                      }
                    >
                      {country?.disabled &&
                      !country?.isHeader &&
                      !country?.isDivider
                        ? country?.label
                        : country?.isHeader || country?.isDivider
                        ? country?.label
                        : `${country?.label} (${country?.currency} ${country?.symbol})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isDifferentRegion ? (
            // Current Region Data Display
            <>
              {/* Confidence Badge */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <Badge
                  className={`${confidenceLevel?.bgColor} ${confidenceLevel?.textColor} border-none px-3 py-1.5`}
                >
                  <span
                    className={`w-2 h-2 ${confidenceLevel?.dotColor} rounded-full mr-2`}
                  ></span>
                  {confidenceLevel?.label} Confidence ({salaryData?.confidence}
                  %)
                </Badge>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  📍 {currentRegionData?.label}
                </span>
              </div>

              {/* Main Salary Display */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-green-800 mb-2">
                  {formatCurrency(salaryData?.min, salaryData?.currency)} -{" "}
                  {formatCurrency(salaryData?.max, salaryData?.currency)}
                </div>
                <div className="text-lg text-green-600 mb-4 font-medium">
                  Annual Salary Range • {salaryData?.currency}
                </div>
                {salaryData?.desired > 0 && (
                  <div className="text-sm text-gray-700">
                    Your Target:{" "}
                    <span className="font-bold text-green-700">
                      {formatCurrency(
                        salaryData?.desired,
                        salaryData?.currency
                      )}
                    </span>
                    {isWithinRange && (
                      <span className="ml-2 text-green-700 font-semibold">
                        ✓ Within Range
                      </span>
                    )}
                    {!isWithinRange &&
                      salaryData?.desired > salaryData?.max && (
                        <span className="ml-2 text-amber-700 font-semibold">
                          ⚠ Above Range
                        </span>
                      )}
                    {!isWithinRange &&
                      salaryData?.desired < salaryData?.min && (
                        <span className="ml-2 text-red-700 font-semibold">
                          ⚠ Below Range
                        </span>
                      )}
                  </div>
                )}
              </div>

              {/* Salary Range Visualization */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium text-gray-600">
                    25th Percentile
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    50th Median
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    75th Percentile
                  </span>
                </div>

                {/* Salary Range Bar */}
                <div className="relative h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden mb-4 shadow-inner">
                  {/* Range Bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-sm"
                    style={{ width: "100%" }}
                  ></div>

                  {/* Percentile Markers */}
                  <div className="absolute inset-y-0 flex items-center justify-between w-full px-3">
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg border-2 border-green-400"></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg border-2 border-green-500"></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg border-2 border-green-600"></div>
                  </div>

                  {/* Your Target Marker */}
                  {salaryData?.desired > 0 && isWithinRange && (
                    <div
                      className="absolute inset-y-0 flex items-center z-10"
                      style={{
                        left: `${Math.min(Math.max(targetPosition, 5), 95)}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  )}
                </div>

                {/* Salary Values */}
                <div className="flex justify-between text-sm font-semibold text-gray-800">
                  <span>
                    {formatCurrency(salaryData?.min, salaryData?.currency)}
                  </span>
                  <span>
                    {formatCurrency(salaryData?.median, salaryData?.currency)}
                  </span>
                  <span>
                    {formatCurrency(salaryData?.max, salaryData?.currency)}
                  </span>
                </div>
              </div>

              {/* Additional Market Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 text-lg">
                      {salaryData?.confidence}%
                    </div>
                    <div className="text-gray-600 text-xs">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 text-lg">
                      {currentRegionData?.label}
                    </div>
                    <div className="text-gray-600 text-xs">Market</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 text-lg">
                      {salaryData?.currency}
                    </div>
                    <div className="text-gray-600 text-xs">Currency</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Different Region Selected - Re-analysis Required
            <div className="text-center py-8">
              <div className="mb-6">
                <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Analysis Not Available
                </h3>
                <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                  Your resume was analyzed for{" "}
                  <strong>{currentRegionData?.label}</strong> market. To get
                  salary data for <strong>{selectedRegionData?.label}</strong>,
                  you need to re-analyze your resume.
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
                  <Globe className="h-4 w-4" />
                  <span>
                    {selectedRegionData?.label} uses{" "}
                    {selectedRegionData?.currency} ({selectedRegionData?.symbol}
                    )
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleReAnalysis}
                  disabled
                  className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-6 py-2 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Re-analyze for {selectedRegionData?.label}
                </Button>

                <div className="text-xs text-gray-500">
                  This will update your salary analysis based on{" "}
                  {selectedRegionData?.label} market conditions
                </div>

                <Button
                  variant="outline"
                  onClick={() => setSelectedRegion(currentRegionData?.value)}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Back to {currentRegionData?.label} Analysis
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SalaryBandChart;
