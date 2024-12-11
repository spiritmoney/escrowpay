import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "../../countries.json";

interface PhoneInputProps {
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  className,
}) => {
  // Parse the initial phone number to separate country code and number
  const [selectedCountry, setSelectedCountry] = React.useState(() => {
    if (!value) return countries[0]; // Default to first country (Nigeria)

    // Look for country code with or without plus sign
    const country = countries.find(country => {
      const dialCode = country.dialCode.replace('+', '');
      return value.startsWith(dialCode) || value.startsWith(`+${dialCode}`);
    });
    return country || countries[0];
  });

  const [phoneNumber, setPhoneNumber] = React.useState(() => {
    if (!value) return "";
    // Remove country code (with or without plus) from phone number
    const dialCode = selectedCountry.dialCode.replace('+', '');
    return value.replace(new RegExp(`^\\+?${dialCode}`), '');
  });

  // Handle country selection
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      // Include the plus sign in the new value
      const newValue = country.dialCode + phoneNumber; // dialCode already includes '+'
      onChange(newValue);
    }
  };

  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setPhoneNumber(newNumber);
    // Include the plus sign in the new value
    const newValue = selectedCountry.dialCode + newNumber; // dialCode already includes '+'
    onChange(newValue);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Select
        value={selectedCountry.code}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue>
            {selectedCountry.dialCode}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem
              key={country.code}
              value={country.code}
            >
              {country.name} ({country.dialCode})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Phone number"
        className="flex-1"
      />
    </div>
  );
};

export default PhoneInput;
