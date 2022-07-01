import { ElementDefinition } from '@veloce/sdk/cms';

@ElementDefinition({
  name: 'Shared',
  type: 'CONTAINER',
  children: ['AttributesSidebar', 'MessagesPanel', 'PortsViewer', 'PortsSidebar', 'Docgen_duplicate'],
})
export class Script {
  constructor() {}
}
