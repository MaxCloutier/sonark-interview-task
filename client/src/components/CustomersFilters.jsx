import { Button, Select, TextInput } from "grommet";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCostumersFilters } from "../utils/api";
import styled from "styled-components";

const selectCountryOption = { label: "Select a Country", value: null };
const selectCityOption = { label: "Select a City", value: null };

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 0 -5px 20px;

  & > * {
    margin: 0 5px;
  }
`;

const Input = styled.input`
  background: transparent;
  border-radius: 4px;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.33);
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: 11px;
  width: 100%;
  width: 40%;
`;

const CustomersFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(selectCountryOption);
  const [selectedCity, setSelectedCity] = useState(selectCityOption);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getCostumersFilters()
      .then((res) => {
        setLoading(false);
        setFilters(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const applyFilters = (filters) => {
    const filterParams = Object.keys(filters).reduce((acc, key) => {
      const val = filters[key];
      if (val) {
        acc.push(`${key}=${val}`);
      }

      return acc;
    }, []);

    onApplyFilters(filterParams.join("&"));
  };

  const handleCountryChange = ({ option }) => {
    setSelectedCountry(option);
    setSelectedCity(selectCityOption);
    setValue("country", option.value);
    setValue("city", selectCityOption.value);
  };

  const handleCityChange = ({ option }) => {
    setSelectedCity(option);
    setValue("city", option.value);
  };

  React.useEffect(() => {
    register("country");
    register("city");
  }, [register]);

  const countriesOptions =
    filters.countries?.map((country) => ({
      label: country,
      value: country,
    })) || [];

  const citiesOptions = selectedCountry.value
    ? filters.countryCities[selectedCountry.value]?.map((city) => ({
        label: city,
        value: city,
      }))
    : [];

  return (
    <Form onSubmit={handleSubmit(applyFilters)}>
      <Input
        className="keywords-input"
        name="keywords"
        placeholder="Type customer name"
        ref={register}
      />
      <Select
        options={[selectCountryOption, ...countriesOptions]}
        onChange={handleCountryChange}
        value={selectedCountry}
        valueKey="value"
        labelKey="label"
        name="countryInput"
      />
      <Select
        options={[selectCityOption, ...citiesOptions]}
        onChange={handleCityChange}
        value={selectedCity}
        disabled={!selectedCountry.value}
        valueKey="value"
        labelKey="label"
        name="cityInput"
      />
      <Button primary type="submit" label="Search" />
    </Form>
  );
};

export default CustomersFilters;
