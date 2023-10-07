// -----------------------------------------------------------------------------
// File Name      : AnAbstractModel.h
// Generated by : SimSatGenerator-1.1.0.202305111213
// -----------------------------------------------------------------------------
/// @file ns/AnAbstractModel.h

#ifndef NS_ANABSTRACTMODEL_H_
#define NS_ANABSTRACTMODEL_H_

// Include the generated header file
#include "ns/AnAbstractModelGen.h"

// ----------------------------------------------------------------------------
// ------------------------ Types and Interfaces ------------------------
// ----------------------------------------------------------------------------

namespace ns {
class AnAbstractModel: public AnAbstractModelGen {
public:
    // ------------------------------------------------------------------------------------
    // -------------------------- Constructors/Destructor --------------------------
    // ------------------------------------------------------------------------------------

    /// Constructor setting name, description and parent.
    /// @param name Name of new model instance.
    /// @param description Description of new model instance.
    /// @param parent Parent of new model instance.
    /// @param simulator The simulator.
    AnAbstractModel(::Smp::String8 name, ::Smp::String8 description,
            ::Smp::IComposite *parent, ::Smp::ISimulator *simulator);

    /// Virtual destructor to release memory.
    ~AnAbstractModel() override;

private:
    // AnAbstractModelGen call DoPublish/DoConfigure/DoConnect/DoDisconnect
    friend class ::ns::AnAbstractModelGen;

    /// Publish fields, operations and properties of the model.
    /// @param receiver Publication receiver.
    void DoPublish(::Smp::IPublication *receiver);

    /// Request for configuration.
    /// @param logger Logger to use for log messages during Configure().
    /// @param linkRegistry Link Registry to use for registration of
    ///         links created during Configure() or later.
    void DoConfigure(::Smp::Services::ILogger *logger,
            ::Smp::Services::ILinkRegistry *linkRegistry);

    /// Connect model to simulator.
    /// @param simulator Simulation Environment that hosts the model.
    ///
    void DoConnect(::Smp::ISimulator *simulator);

    /// Disconnect model to simulator.
    /// @throws Smp::InvalidComponentState
    void DoDisconnect();

};
} // namespace ns

#endif // NS_ANABSTRACTMODEL_H_