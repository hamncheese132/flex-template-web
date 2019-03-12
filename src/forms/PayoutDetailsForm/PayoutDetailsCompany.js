import React from 'react';
import { bool, string } from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import * as validators from '../../util/validators';
import { FieldPhoneNumberInput, FieldTextInput } from '../../components';

import * as normalizePhoneNumberUS from './normalizePhoneNumberUS';
import PayoutDetailsBusinessProfile from './PayoutDetailsBusinessProfile';
import css from './PayoutDetailsForm.css';

const PayoutDetailsCompany = props => {
  const { fieldId, disabled, intl, country, showBusinessURLField, showMCCForUSField, showPhoneNumberField } = props;

  const companyNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyNameLabel' });
  const companyNamePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.companyNamePlaceholder',
  });
  const companyNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.companyNameRequired',
    })
  );

  const companyTaxIdLabel = intl.formatMessage({
    id: `PayoutDetailsForm.companyTaxIdLabel.${country}`,
  });
  const companyTaxIdPlaceholder = intl.formatMessage(
    {
      id: 'PayoutDetailsForm.companyTaxIdPlaceholder',
    },
    {
      idName: companyTaxIdLabel,
    }
  );
  const companyTaxIdRequired = validators.required(
    intl.formatMessage(
      {
        id: 'PayoutDetailsForm.companyTaxIdRequired',
      },
      {
        idName: companyTaxIdLabel,
      }
    )
  );

  const phoneLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyPhoneLabel' });
  const phonePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.companyPhonePlaceholder',
  });
  const phoneNumberForUSRequired = validators.required(
    intl.formatMessage({ id: 'PayoutDetailsForm.companyPhoneRequired' })
  );

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>
        <FormattedMessage id="PayoutDetailsForm.companyDetailsTitle" />
      </h3>
      <FieldTextInput
        id={`${fieldId}.name`}
        name={`${fieldId}.name`}
        className={css.textInputRow}
        autoComplete="organization"
        disabled={disabled}
        label={companyNameLabel}
        placeholder={companyNamePlaceholder}
        type="text"
        validate={companyNameRequired}
      />

      <FieldTextInput
        id={`${fieldId}.taxId`}
        name={`${fieldId}.taxId`}
        className={css.textInputRow}
        autoComplete="company-tax-id"
        disabled={disabled}
        label={companyTaxIdLabel}
        placeholder={companyTaxIdPlaceholder}
        type="text"
        validate={companyTaxIdRequired}
      />

      <PayoutDetailsBusinessProfile
        country={country}
        disabled={disabled}
        fieldId="businessProfile"
        showBusinessURLField={showBusinessURLField}
        showMCCForUSField={showMCCForUSField}
        intl={intl}
      />

      {showPhoneNumberField ? (
        <FieldPhoneNumberInput
          id={`${fieldId}.phone`}
          name={`${fieldId}.phone`}
          className={css.textInputRow}
          autoComplete="tel-national"
          label={phoneLabel}
          format={normalizePhoneNumberUS.format}
          parse={normalizePhoneNumberUS.parse}
          placeholder={phonePlaceholder}
          type="text"
          validate={phoneNumberForUSRequired}
        />
      ) : null}
    </div>
  );
};

PayoutDetailsCompany.defaultProps = {
  id: null,
  disabled: false,
};

PayoutDetailsCompany.propTypes = {
  id: string,
  disabled: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default PayoutDetailsCompany;