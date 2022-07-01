import { ElementDefinition } from '@veloce/sdk/cms';

@ElementDefinition({
  name: 'Shared',
  type: 'CONTAINER',
  children: ['AttributesSidebar', 'MessagesPanel', 'PortsViewer', 'PortsSidebar', 'Docgen'],
})
export class Script {
  constructor() {}
}
