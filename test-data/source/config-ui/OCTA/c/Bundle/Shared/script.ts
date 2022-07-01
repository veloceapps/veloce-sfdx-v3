import { ElementDefinition } from '@veloce/sdk/cms';

@ElementDefinition({
  name: 'Shared',
  type: 'CONTAINER',
  children: ['PortsViewer', 'MessagesPanel', 'AttributesSidebar', 'PortsSidebar', 'Docgen'],
})
export class Script {
  constructor() {}
}
