import { useState } from "react";
import { EXAMPLES } from "../data";
import Section from "./Section";
import TabButton from "./TabButton";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  const handleSelect = (selectedButton) => {
    setSelectedTopic(selectedButton);
  };

  let tabContent = <p>Please select a topic</p>;

  if (selectedTopic) {
    tabContent = (
      <>
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </>
    );
  }

  return (
    <Section id="examples" title="Examples">
      <menu>
        {Object.keys(EXAMPLES).map((topic) => (
          <TabButton
            key={topic}
            isSelected={selectedTopic === topic}
            onClick={() => handleSelect(topic)}
          >
            {EXAMPLES[topic].title}
          </TabButton>
        ))}
      </menu>

      <div id="tab-content">{tabContent}</div>
    </Section>
  );
}
