Routes thus Far

## Authentication

- *POST* `/api/auth/register` 
  - Input: 
    - Object of new Prison info
      - `location`: string, required, unique
      - `population`: integer, required
      - `password`: string, required, 12 characters or more
      - `zipcode`: integer
  - Output:
    - JSON of New Prison object
      - `ID`: auto incremented
      - `location`: string
      - `population`: integer
      - `zipcode`: integer, if provided
      - `prisoners`: array, if provided


- *POST* `/api/auth/login`
  - input:
    - object of credentials
      - `location`: string, required
      - `password`: string, required
  - output:
    - `token`: JWT for Authentication


## Prisons
- *GET* `/api/prisons/`
  - returns all prisons in DB or empty array if none exist

- *GET* `/api/prisons/:id`
  - returns specified prison

- *GET* `/api/prisons/:id/prisoners`
  - returns all prisoners associated with prison
  - returns error if prison does no exist or no prisoners are associated with it

- _restricted_ *PUT* `/api/prisons/:id`
  - Only prison admin can view their prison
  - does NOT require the full prison object to be submitted
  - hashes the new password if one is provided

- _restricted_ *DELETE* `/api/prisons/:id`
  - Only prison admin can view their prison
  - deletes prison with matching `id` from db


## Prisoners
- _restricted_ *POST* `api/prisoners/`
  - Input: an object of a new prisoner
    - `name`: string, required
    - `id_number`: integer, unique, required
    - `skills`: string, comma separated values
  - Output: New Prisoner object including:
    - `id`: auto incremented on backend
    - `name`: string
    - `id_number`: integer
    - `prison_id`: assigned on back end using login info


- *GET* `/api/prisoners/`
  - returns array with prisoner objects including:
    - `id`: integer
    - `name`: string
    - `id_number`: integer
    - `prison_id`: integer
    - `location`: string (from prisons table)

- *GET* `/api/prisoners/:id`
  - returns object of prisoner based on id
    - `id`: integer
    - `name`: string
    - `id_number`: integer
    - `prison_id`: integer
    - `prison`: object with prison information
      - `location`: string
      - `population`: integer
      - `zipcode`: integer
    - `skills`: object of skills (if any)
      - `name`: string

- _restricted_ *PUT* `/api/prisoners/:id`
  - checks for existing record in DB before updating
  - INPUT: Accepts but does not require any of the following:
    - `name`: string
    - `prison_id`: integer
    - `id_number`: intger
    - `skills`: string of CSV
  - OUTPUT: updated prisoner object WITHOUT skills (but skills are indeed updated)

- _restricted_ *DELETE* `/api/prisoners/:id`
  - checks for existing record in DB before deleting
  - Returns message stating "_prisoner.name_ has been successfully deleted"

### *** individual skills can not be removed from a prisoner YET ***