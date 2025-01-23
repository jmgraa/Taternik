# Design patterns used in the project

## Container-Presenter Pattern

The `TrailSearchTemplate` component is designed using the **Container-Presenter** Pattern to separate presentation logic from business logic.

- `TrailSearchTemplate` **(Container Component)**: This component serves as a container that focuses on rendering the layout and structure of the UI. It wraps the `OriginDestinationSearch` component, providing a layout but without handling any business logic or data fetching.

- `OriginDestinationSearch` **(Presenter Component)**: This component functions as a presenter, handling business logic and data fetching. It utilizes the `searchPeaks` function from `@/app/services/peakSearchService` to fetch data, update the UI, and manage user interactions.

## Adapter Pattern

The `Map` component in `app/components/atoms/Map.tsx` demonstrates the use of the Adapter Pattern to integrate a third-party library (`@rnmapbox/maps`) with the project's architecture.

- `MapView` **(Third-Party Component)**: This component, provided by the `@rnmapbox/maps` library, offers specific functionality for rendering maps.

- `Map` **(Adapter Component)**: The `Map` component acts as an adapter, wrapping the `MapView` component to align it with the project's architecture. By doing so, the `Map` component allows customization of the behavior and properties of the `MapView` component to better fit the project's needs.

## Service Pattern

The `TrailSearchService`, `PeakSearchService`, `CameraService`, and `DateTimeService` in `@/app/services` demonstrate the use of the Service Pattern to encapsulate business logic and data fetching.

- `TrailSearchService`: This service handles trail search-related business logic, such as finding trails between peaks and updating the UI. It utilizes the `pathToGeoJSON` function from `geojson-path-finder` to fetch data and manage user interactions.

- `PeakSearchService`: This service handles peak search-related business logic, such as searching for peaks by name. It utilizes the `Fuse.js` library to fetch data and manage user interactions.

- `CameraService`: This service handles camera-related business logic, such as centering the camera on a peak or adjusting the camera to a trail. It utilizes the `@rnmapbox/maps` library to manage camera interactions.

- `DateTimeService`: This service handles date and time-related business logic, providing a centralized way to manage date and time formatting and calculations.

All these services act as a layer of abstraction, separating the business logic from the presentation logic, and allowing for easier maintenance and scalability of the application.

## Atomic Design Pattern

Atomic Design is a methodology for creating design systems. It breaks down UI components into five distinct levels: **atoms**, **molecules**, **organisms**, **templates**, and **pages**. This modular approach allows for a more structured and scalable way to build and manage UI components in a project.

- **Atoms** are the basic building blocks of the interface. They are the smallest, indivisible components, such as buttons, input fields, labels, and icons. In this project, the `atoms` directory contains components that are fundamental and do not have dependencies on other components.

    - `FormField.tsx`: A basic form input field.
    - `Map.tsx`: A standalone map component.
    - `ModalAlert.tsx`: A simple modal alert dialog.
    - `SearchBar.tsx`: A search bar input.

- **Molecules** are groups of atoms bonded together and form more complex UI elements. These components are simple yet functional and are often composed of multiple atoms working together to perform a specific function.

    - `RoundButtonsContainer.tsx`: A container that holds multiple round buttons.
    - `SearchList.tsx`: A list that displays search results.

- **Organisms** are relatively complex components composed of groups of molecules and/or atoms. They form distinct sections of an interface and can function independently within a page or template.

    - `InfoTabButtons.tsx`: A set of buttons for different informational tabs.
    - `MapRoundButtons.tsx`: A collection of round buttons overlaid on a map.
    - `OriginDestinationSearch.tsx`: A component for searching origin and destination locations.

- **Templates** are page-level components that define the layout of the application. They consist of groups of organisms stitched together to form pages. Templates focus on the structure and layout rather than the content.

    - `MapTemplate.tsx`: A template that structures the map view.
    - `TrailSearchTemplate.tsx`: A template designed for the trail search feature.

## Observer Pattern

The Observer Pattern is a design pattern that allows objects to be notified of changes to other objects without having a direct reference to one another. In this project, the Observer Pattern is used indirectly in various components, such as buttons and search bars, to manage their state and behavior.

### Disabled State for Buttons

In Taternik, buttons are disabled or enabled based on certain conditions, such as the presence of data or the state of other components. This is achieved by using the Observer Pattern, where the button's disabled state is observed by a central authority, such as a state management system or a parent component.

For example, in the `RoundButtonsContainer` component, the `disabled` prop is passed down to individual buttons, which then use this prop to determine their disabled state. This allows the buttons to be dynamically enabled or disabled based on changes to the parent component's state.

### Query for Search Bar

Similarly, the search bar's query state is observed by other components, such as the `SearchList` component, which uses this query to fetch and display relevant data. When the user types in the search bar, the query state is updated, and the `SearchList` component is notified of this change, triggering it to fetch new data.

This indirect use of the Observer Pattern allows components to be loosely coupled, making it easier to manage complex state changes and behaviors. By decoupling the components that need to be notified of changes from the components that trigger those changes, we can create a more modular and scalable architecture.

## Query Object Pattern

The Query Object pattern is a design pattern that encapsulates a query or a set of criteria into an object, making it easier to parameterize and reuse queries.
In Taternik, Query Object pattern is used in the `TrailSearchService` class. The `getPeakById` method is an example of a query object that encapsulates the query logic for searching peaks by ID. The method takes a `geojson` object and an `id` string as parameters and returns a `Feature<Point, PeakProperties>` object that matches the specified `id`. This method encapsulates the query logic for searching peaks by ID, making it easy to reuse and modify.
