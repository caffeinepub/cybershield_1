# Specification

## Summary
**Goal:** Add digital signature functionality for security policies to ensure policy integrity and authenticity.

**Planned changes:**
- Add digital signature field to SecurityPolicy backend type
- Create backend functions to sign and verify policy signatures
- Add "Sign Policy" button to each policy card in the UI
- Display signature verification status (Signed & Valid, Invalid Signature, Unsigned) on each policy card
- Create React Query hooks for signing and verifying policy signatures

**User-visible outcome:** Users can sign security policies with a button click and see color-coded badges indicating whether each policy is signed and valid, has an invalid signature, or is unsigned.
