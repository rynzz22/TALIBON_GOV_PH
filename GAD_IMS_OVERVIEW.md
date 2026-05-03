# Talibon GAD Analytics App - System Overview & Integration Plan

## Project Overview
The Gender and Development (GAD) Information Management System (IMS) is designed to be an independent, robust analytical tool for the Municipality of Talibon. While it exists as its own codebase and server, it will be seamlessly integrated into the main Talibon Digital Core portal via secure API links and iframe embedding.

## Key Modules
1. **Beneficiary Profiling**: Automated encoding of sex-disaggregated individual records.
2. **Program Monitoring**: Tracking of services availed by sector (PWD, Senior, etc.).
3. **Real-time Analytics**: Visualization of gender-specific data across 25 barangays.
4. **Policy Compliance**: Automated generation of GPB and GAR support tables.

## System Architecture
- **Front-end**: React with TailWind CSS (Independent repository)
- **Back-end**: Supabase (Independent project for strict data privacy/HIPAA-like compliance)
- **Database**: PostgreSQL with specialized views for GAD analytics.

## Integration Steps
1. **Main Portal Link**: The "GAD IMS" button in the Municipal portal will link to a subdomain (e.g., `gad.talibon.gov.ph`).
2. **Shared Login**: Future integration will use Single Sign-On (SSO) between the main portal and the GAD system.
3. **Data Sync**: Key demographic totals from GAD IMS will be pushed to the main portal's `barangay_stats` table via a secure webhook.

## Technical Files Placeholder
This project currently contains:
- `SUPABASE_SCHEMA.sql`: (Partial) Base structure for GAD beneficiaries.
- `seed_gad_ims.sql`: Initial sample structure for independent testing.

*Note: This system is being developed independently and will be fully integrated during Phase 2 of the Municipality's Digitalization Program.*
