interface ContainerIndividualProps {
    children: React.ReactNode;
  }
  
  const ContainerIndividual: React.FC<ContainerIndividualProps> = ({
    children
  }) => {
    return ( 
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
     );
  };
  
  export default ContainerIndividual;