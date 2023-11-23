/// <reference types="cypress" />


describe('heroku testsuite', function(){

    before(function(){
        cy.fixture('example').then(function(data){
            this.data=data
        })
    })
    it('DynamicTablePage',function(){
        cy.visit(this.data.url)
        cy.get('summary').click()

    })

    it('Fills table rows with JSON data', () => {
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');

        cy.get('#dynamictable').then(($headerRow) => {
            const $genderHeaderCell = Cypress.$('<th colspan="2">Gender</th>');
      
            $headerRow.find('th').eq(1).after($genderHeaderCell);
        });
        
    it('Adds gender for Bob row in the table', () => {
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
            
         cy.get('#dynamictable').contains('td', 'Bob').parent('tr').within(() => {
                cy.get('[colspan="2"]').eq(2).invoke('text', 'male'); 
        });
    });

    it('Adds gender for George row in the table', () => {
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
            
        cy.get('#dynamictable').contains('td', 'George').parent('tr').within(() => {
                cy.get('[colspan="2"]').eq(2).invoke('text', 'male'); 
        });
    });
  
        cy.get('#dynamictable').then(($tbody) => {
          const jsonData = [
           
            {"name": "Sara", "age": 42, "gender": "female"},
            {"name": "Conor", "age": 40, "gender": "male"},
            {"name": "Jennifer", "age": 42, "gender": "female"}
          ];

    
          jsonData.forEach(data => {
            const { name, age, gender } = data;
   
            const $row = Cypress.$('<tr>');
            $row.append(`<td>${name}</td>`);
            $row.append(`<td>${age}</td>`);
            $row.append(`<td>${gender}</td>`);
            $tbody.append($row);

            cy.get('summary').click()
            //cy.get('#jsondata').click()

          });
          cy.get('#jsondata').click()
          cy.wait(2000);
          cy.get('#jsondata').invoke('val',`[{"name": "Bob", "age": 20, "gender": "male"},
          {"name": "George", "age": 42, "gender": "male"},{"name": "Sara", "age": 42, "gender": "female"},
          {"name": "Conor", "age": 40, "gender": "male"},{"name": "Jennifer", "age": 42, "gender": "female"}
          ]`);

         cy.get('#refreshtable').click()

         cy.get('#dynamictable > :nth-child(3) > :nth-child(1)').contains('Bob').should('exist');
         cy.get(':nth-child(3) > :nth-child(2)').contains('20').should('exist');
         cy.get(':nth-child(3) > :nth-child(3)').contains('male').should('exist');

         cy.get('#dynamictable > :nth-child(4) > :nth-child(1)').contains('George').should('exist');
         cy.get('#dynamictable > :nth-child(4) > :nth-child(2)').contains('42').should('exist');
         cy.get(':nth-child(4) > :nth-child(3)').contains('male').should('exist');
         
         cy.get('#dynamictable > :nth-child(5) > :nth-child(1)').contains('Sara').should('exist');
         cy.get('#dynamictable > :nth-child(5) > :nth-child(2)').contains('42').should('exist');
         cy.get('#dynamictable > :nth-child(5) > :nth-child(3)').contains('female').should('exist');
         
         cy.get(':nth-child(6) > :nth-child(1)').contains('Conor').should('exist');
         cy.get(':nth-child(6) > :nth-child(2)').contains('40').should('exist');
         cy.get(':nth-child(6) > :nth-child(3)').contains('male').should('exist');
         
         cy.get(':nth-child(7) > :nth-child(1)').contains('Jennifer').should('exist');
         cy.get(':nth-child(7) > :nth-child(2)').contains('42').should('exist');
         cy.get(':nth-child(7) > :nth-child(3)').contains('female').should('exist');

        });

    });

})