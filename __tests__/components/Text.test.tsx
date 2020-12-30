import "react-native";
import React from "react";
import { Text } from "../../src/components";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("Renders loading correctly", () => {
  renderer.create(<Text />);
});
