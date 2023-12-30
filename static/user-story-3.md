### User Story #3: Implement Monthly Filter for Leaderboard

As a user, I want to have the ability to filter the leaderboard based on different months. Clicking on a specific month should update the leaderboard to only include the points accumulated by users during that month.

#### Acceptance Criteria
- [ ] Users should be able to select a month to view the leaderboard data for that specific month.
    - [ ] The months should only be the current month and retroactive back for 12 months. For example, if the current month is September in 2023. The the options should be...
        - Septmber 2023
        - August 2023
        - July 2023
        - June 2023
        - May 2023
        - April 2023
        - March 2023
        - February 2023
        - January 2023
        - December 2022
        - November 2022
        - October 2022
- [ ] The leaderboard should update to only include points that users accumulated during the selected month.

### Notes
We would rather you start with doing to backend code for this, and not spend too much time on the frontend interface to select the month. In a worse case scenario, where you cannot complete the frontend part in time. It is okay to hardcode a parameter or body into the api request.