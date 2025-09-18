import React from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required = false,
  options = [],
  className = "",
  values = [],
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select
            options={options}
            error={error}
            {...props}
          />
        );
      
      case "checkbox":
        return (
          <div className="space-y-2">
            {values.map((value) => (
              <label key={value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.value === value}
                  onChange={(e) => props.onChange?.({ target: { name: props.name, value: e.target.checked ? value : "" } })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        );
      
      case "radio":
        return (
          <div className="space-y-2">
            {values.map((value) => (
              <label key={value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={props.name}
                  value={value}
                  checked={props.value === value}
                  onChange={props.onChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        );
      
      case "currency":
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              step="0.01"
              min="0"
              error={error}
              className="pl-8"
              {...props}
            />
          </div>
        );
      
      case "website":
        return (
          <Input
            type="url"
            error={error}
            placeholder="https://example.com"
            {...props}
          />
        );
      
      case "rating":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => props.onChange?.({ target: { name: props.name, value: star.toString() } })}
                className={`w-8 h-8 ${
                  parseInt(props.value || 0) >= star 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {props.value ? `${props.value}/5` : '0/5'}
            </span>
          </div>
        );
      
      case "tag":
        return (
          <div className="space-y-2">
            <Input
              type="text"
              error={error}
              placeholder="Type and press Enter to add tags"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const newTag = e.target.value.trim();
                  if (newTag && !props.value?.split(',').map(t => t.trim()).includes(newTag)) {
                    const currentTags = props.value ? props.value.split(',').map(t => t.trim()) : [];
                    const updatedTags = [...currentTags, newTag];
                    props.onChange?.({ target: { name: props.name, value: updatedTags.join(', ') } });
                    e.target.value = '';
                  }
                }
              }}
            />
            {props.value && (
              <div className="flex flex-wrap gap-2">
                {props.value.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const currentTags = props.value.split(',').map(t => t.trim());
                        const updatedTags = currentTags.filter(t => t !== tag);
                        props.onChange?.({ target: { name: props.name, value: updatedTags.join(', ') } });
                      }}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return <Input type={type} error={error} {...props} />;
    }
  };
  
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;